// SPDX-License-Identifier: MIT
/*
*  @dev We had to write our own to avoid dealing with OZ version control issues 
*  Implementation combines: 
*  - the transparency of UniswapV2ERC20 
*  - _update as the main router in latest OZ docs 
*  - adding our own totalSupply and totalMinted variables 
*  - adding our own name(), symbol(), and decimals() functions to keep track of token name, symbol, and decimals to escape the metadata 
*  - use Solady to call supportsInterface() and _checkOnERC721Received()
*  - forked the Strings library to call it locally
*/ 

import {Strings} from 'src/libraries/Strings.sol';

pragma solidity ^0.8.20;

interface IBonderV1ERC721 {
    
    // OG ERC721
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    // no need getter functions as mappings are public
    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function isApprovedForAll(address owner, address operator) external view returns (bool);

    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId) external view returns (address operator);
    function setApprovalForAll(address operator, bool _approved) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;

    // Bonder addons
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function totalSupply() external view returns (uint256);
    function totalMinted() external view returns (uint256);

}


contract BonderV1ERC721 is IBonderV1ERC721 {
    using Strings for uint256;

    string public name;
    string public symbol;

    uint256 public totalSupply;
    uint256 public totalMinted;

    mapping(address => uint256) public balanceOf;
    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => address) public tokenApprovals;
    mapping(address owner => mapping(address operator => bool)) public isApprovedForAll;

    constructor(string memory name_, string memory symbol_) {
        name = name_;
        symbol = symbol_;
    }

       function supportsInterface(bytes4 interfaceId) public view virtual returns (bool result) {
        /// @solidity memory-safe-assembly
        assembly {
            let s := shr(224, interfaceId)
            // ERC165: 0x01ffc9a7, ERC721: 0x80ac58cd, ERC721Metadata: 0x5b5e139f.
            result := or(or(eq(s, 0x01ffc9a7), eq(s, 0x80ac58cd)), eq(s, 0x5b5e139f))
        }
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(ownerOf[tokenId] != address(0), 'Token is not owned by anyone');
        return bytes(baseURI).length > 0 ? string.concat(baseURI, tokenId.toString()) : '';
    }

    string public baseURI;

    function setBaseURI(string memory baseURI_) external {
        baseURI = baseURI_;
    }

    function approve(address to, uint256 tokenId) external {
        address owner = ownerOf[tokenId];

        require(owner == msg.sender || isApprovedForAll[owner][msg.sender], 'Caller is not owner nor approved for all');
        _approve(to, tokenId);
    }

    function getApproved(uint256 tokenId) public view returns (address operator) {
        require(ownerOf[tokenId] != address(0), 'Token is not owned by anyone');
        return tokenApprovals[tokenId];
    }

    function setApprovalForAll(address operator, bool approved) external {
        // require(operator != msg.sender, "Approve another address other than yours");

        isApprovedForAll[msg.sender][operator] = approved;
        // _setApprovalForAll(_msgSender(), operator, approved);
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function transferFrom(address from, address to, uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), 'Caller is not owner nor approved');
        require(to != address(0), 'Invalid receiver');
        _transfer(from, to, tokenId);
    }

     function safeTransferFrom(address from, address to, uint256 tokenId) public {
        safeTransferFrom(from, to, tokenId, '');
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public virtual {
        transferFrom(from, to, tokenId);
        _checkOnERC721Received(from, to, tokenId, data);
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool) {
        require(ownerOf[tokenId] != address(0), 'Token does not exist');
        address owner = ownerOf[tokenId];
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll[owner][spender]);
    }

    function _update(address to, uint256 tokenId) internal returns (address) {
        address from = ownerOf[tokenId];

        if (from == address(0)) {
            totalSupply++;
            totalMinted++;
        } else {
            _approve(address(0), tokenId);
            unchecked {
                balanceOf[from] -= 1;
            }
        }

        if (to == address(0)) {
            totalSupply--;
        } else {
            unchecked {
                balanceOf[to] += 1;
            }
        }

        ownerOf[tokenId] = to;
        emit Transfer(from, to, tokenId);
        return from;
    }

    function _mint(address to) internal {
        _update(to, totalMinted + 1);
    }

    function _safeMint(address to) internal {
        _safeMint(to, '');
    }

    function _safeMint(address to, bytes memory data) internal {
        _mint(to);
        _checkOnERC721Received(address(0), to, totalMinted + 1, data);
    }

    function _burn(uint256 tokenId) internal {
        _update(address(0), tokenId);
    }

    function _transfer(address from, address to, uint256 tokenId) internal {
        require(ownerOf[tokenId] == from, 'ERC721: transfer of token that is not own');
        _update(to, tokenId);
    }

    function _safeTransfer(address from, address to, uint256 tokenId) internal {
        _safeTransfer(from, to, tokenId, '');
    }

    function _safeTransfer(address from, address to, uint256 tokenId, bytes memory data) internal virtual {
        _transfer(from, to, tokenId);
        _checkOnERC721Received(from, to, tokenId, data);
    }

    function _approve(address to, uint256 tokenId) internal {
        tokenApprovals[tokenId] = to;
        emit Approval(ownerOf[tokenId], to, tokenId);
    }

     //------------------------------------------ From Solady ------------------------------------------//
    /// @dev Perform a call to invoke {IERC721Receiver-onERC721Received} on `to`.
    /// Reverts if the target does not support the function correctly.
    function _checkOnERC721Received(address from, address to, uint256 id, bytes memory data) private {
        /// @solidity memory-safe-assembly
        assembly {
            // Prepare the calldata.
            let m := mload(0x40)
            let onERC721ReceivedSelector := 0x150b7a02
            mstore(m, onERC721ReceivedSelector)
            mstore(add(m, 0x20), caller()) // The `operator`, which is always `msg.sender`.
            mstore(add(m, 0x40), shr(96, shl(96, from)))
            mstore(add(m, 0x60), id)
            mstore(add(m, 0x80), 0x80)
            let n := mload(data)
            mstore(add(m, 0xa0), n)
            if n {
                pop(staticcall(gas(), 4, add(data, 0x20), n, add(m, 0xc0), n))
            }
            // Revert if the call reverts.
            if iszero(call(gas(), to, 0, add(m, 0x1c), add(n, 0xa4), m, 0x20)) {
                if returndatasize() {
                    // Bubble up the revert if the call reverts.
                    returndatacopy(m, 0x00, returndatasize())
                    revert(m, returndatasize())
                }
            }
            // Load the returndata and compare it.
            if iszero(eq(mload(m), shl(224, onERC721ReceivedSelector))) {
                mstore(0x00, 0xd1a57ed6) // `TransferToNonERC721ReceiverImplementer()`.
                revert(0x1c, 0x04)
            }
        }
    }
}