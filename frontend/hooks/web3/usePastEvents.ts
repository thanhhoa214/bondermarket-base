import { useEffect, useState } from 'react';
import { Log, parseAbiItem } from 'viem';
import { useConfig, usePublicClient } from 'wagmi';

const transferEventAbi = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)');
export interface EventWithTimestamp extends Log<bigint, number, false, typeof transferEventAbi> {
  timestamp: bigint;
}
export function usePastEvents(address?: string) {
  const publicClient = usePublicClient();
  const config = useConfig();
  const [events, setEvents] = useState<EventWithTimestamp[]>([]);

  useEffect(() => {
    async function getAllEvents() {
      if (!publicClient || !config || !address) return;

      const latestBlock = await publicClient.getBlock();
      const logs = await publicClient.getLogs({
        address: address as `0x${string}`,
        event: transferEventAbi,
        fromBlock: BigInt(0),
        toBlock: latestBlock.number,
      });

      // Get unique block numbers from logs
      const blockNumbers = [...new Set(logs.map((log) => log.blockNumber))];

      // Fetch block details for each unique block number
      const blockDetails = await Promise.all(blockNumbers.map((blockNumber) => publicClient.getBlock({ blockNumber })));

      // Create a map of block numbers to timestamps
      const blockTimestamps: Record<string, bigint> = Object.fromEntries(
        blockDetails.map((block) => [block.number.toString(), block.timestamp]),
      );

      // Add timestamp to each log
      const logsWithTimestamp: EventWithTimestamp[] = logs.map((log) => ({
        ...log,
        timestamp: blockTimestamps[log.blockNumber.toString()],
      }));

      setEvents(logsWithTimestamp);
    }

    getAllEvents();
  }, [publicClient, config, address]);

  return events;
}
