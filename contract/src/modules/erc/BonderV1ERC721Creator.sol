// SPDX-License-Identifier: MIT

import {Strings} from 'src/libraries/Strings.sol';

pragma solidity ^0.8.20;

interface IBonderV1ERC721Creator {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId) external view returns (address operator);
    function transferFrom(address from, address to, uint256 tokenId) external;
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;

    function creatorToId(address creator) external view returns (uint256);
    function idToCreator(uint256 id) external view returns (address);
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function totalSupply() external view returns (uint256);
    function totalMinted() external view returns (uint256);
}

contract BonderV1ERC721Creator is IBonderV1ERC721Creator {
    using Strings for uint256;

    string public name;
    string public symbol;

    uint256 public totalSupply;
    uint256 public totalMinted;

    mapping(address => uint256) public creatorToId;
    mapping(uint256 => address) public idToCreator;

    mapping(uint256 => address) public tokenApprovals;

    constructor(string memory name_, string memory symbol_) {
        name = name_;
        symbol = symbol_;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual returns (bool result) {
        assembly {
            let s := shr(224, interfaceId)
            result := or(or(eq(s, 0x01ffc9a7), eq(s, 0x80ac58cd)), eq(s, 0x5b5e139f))
        }
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(idToCreator[tokenId] != address(0), 'Token is not owned by anyone');
        return bytes(baseURI).length > 0 ? string.concat(baseURI, tokenId.toString()) : '';
    }

    string public baseURI;

    function setBaseURI(string memory baseURI_) external {
        baseURI = baseURI_;
    }

    function approve(address to, uint256 tokenId) external {
        address owner = idToCreator[tokenId];
        require(owner == msg.sender, 'Caller is not owner');
        _approve(to, tokenId);
    }

    function getApproved(uint256 tokenId) public view returns (address operator) {
        require(idToCreator[tokenId] != address(0), 'Token is not owned by anyone');
        return tokenApprovals[tokenId];
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
        require(idToCreator[tokenId] != address(0), 'Token does not exist');
        address owner = idToCreator[tokenId];
        return (spender == owner || getApproved(tokenId) == spender);
    }

    function _update(address to, uint256 tokenId) internal returns (address) {
        address from = idToCreator[tokenId];

        if (from == address(0)) {
            require(creatorToId[to] == 0, 'Account already has a token');
            totalSupply++;
            totalMinted++;
        } else {
            _approve(address(0), tokenId);
            delete creatorToId[from];
        }

        if (to == address(0)) {
            totalSupply--;
        } else {
            require(creatorToId[to] == 0, 'Account already has a token');
            creatorToId[to] = tokenId;
        }

        idToCreator[tokenId] = to;

        emit Transfer(from, to, tokenId);

        return from;
    }

    function _mint(address to) internal returns (uint256 tokenId) {
        tokenId = totalMinted + 1;
        _update(to, tokenId);
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
        require(idToCreator[tokenId] == from, 'ERC721: transfer of token that is not own');
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
        emit Approval(idToCreator[tokenId], to, tokenId);
    }

    function _checkOnERC721Received(address from, address to, uint256 id, bytes memory data) private {
        assembly {
            let m := mload(0x40)
            let onERC721ReceivedSelector := 0x150b7a02
            mstore(m, onERC721ReceivedSelector)
            mstore(add(m, 0x20), caller())
            mstore(add(m, 0x40), shr(96, shl(96, from)))
            mstore(add(m, 0x60), id)
            mstore(add(m, 0x80), 0x80)
            let n := mload(data)
            mstore(add(m, 0xa0), n)
            if n {
                pop(staticcall(gas(), 4, add(data, 0x20), n, add(m, 0xc0), n))
            }
            if iszero(call(gas(), to, 0, add(m, 0x1c), add(n, 0xa4), m, 0x20)) {
                if returndatasize() {
                    returndatacopy(m, 0x00, returndatasize())
                    revert(m, returndatasize())
                }
            }
            if iszero(eq(mload(m), shl(224, onERC721ReceivedSelector))) {
                mstore(0x00, 0xd1a57ed6)
                revert(0x1c, 0x04)
            }
        }
    }
}