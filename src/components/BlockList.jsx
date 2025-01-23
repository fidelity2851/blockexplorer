import { useEffect, useState } from "react";

function BlockList({ provider }) {
  const [isBlocksLoading, setIsBlocksLoading] = useState(false);
  const [blocks, setBlocks] = useState([]);

  async function getLatestBlocks(count) {
    try {
      setIsBlocksLoading(true);
      const latestBlockNumber = await provider.getBlockNumber();

      // Fetch blocks in parallel
      const blockPromises = Array.from({ length: count }, (_, i) =>
        provider.getBlock(latestBlockNumber - i)
      );

      const blocks = await Promise.all(blockPromises);
      setBlocks(blocks);
    } catch (error) {
      console.error("Error fetching blocks:", error);
    }

    setIsBlocksLoading(false);
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }

  useEffect(() => {
    getLatestBlocks(5);
  }, []);
  return (
    <>
      <div className="space-y-6">
        {/* Is loading spinner */}
        {isBlocksLoading && (
          <>
            <div className="flex justify-start items-center mb-3">
              <svg
                className="me-3"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24">
                <circle cx="12" cy="2" r="0" fill="#16829d">
                  <animate
                    attributeName="r"
                    begin="0"
                    calcMode="spline"
                    dur="1s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
                <circle
                  cx="12"
                  cy="2"
                  r="0"
                  fill="#16829d"
                  transform="rotate(45 12 12)">
                  <animate
                    attributeName="r"
                    begin="0.125s"
                    calcMode="spline"
                    dur="1s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
                <circle
                  cx="12"
                  cy="2"
                  r="0"
                  fill="#16829d"
                  transform="rotate(90 12 12)">
                  <animate
                    attributeName="r"
                    begin="0.25s"
                    calcMode="spline"
                    dur="1s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
                <circle
                  cx="12"
                  cy="2"
                  r="0"
                  fill="#16829d"
                  transform="rotate(135 12 12)">
                  <animate
                    attributeName="r"
                    begin="0.375s"
                    calcMode="spline"
                    dur="1s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
                <circle
                  cx="12"
                  cy="2"
                  r="0"
                  fill="#16829d"
                  transform="rotate(180 12 12)">
                  <animate
                    attributeName="r"
                    begin="0.5s"
                    calcMode="spline"
                    dur="1s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
                <circle
                  cx="12"
                  cy="2"
                  r="0"
                  fill="#16829d"
                  transform="rotate(225 12 12)">
                  <animate
                    attributeName="r"
                    begin="0.625s"
                    calcMode="spline"
                    dur="1s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
                <circle
                  cx="12"
                  cy="2"
                  r="0"
                  fill="#16829d"
                  transform="rotate(270 12 12)">
                  <animate
                    attributeName="r"
                    begin="0.75s"
                    calcMode="spline"
                    dur="1s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
                <circle
                  cx="12"
                  cy="2"
                  r="0"
                  fill="#16829d"
                  transform="rotate(315 12 12)">
                  <animate
                    attributeName="r"
                    begin="0.875s"
                    calcMode="spline"
                    dur="1s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
              </svg>
              Loading
            </div>
          </>
        )}

        {/* Looping out the latest blocks */}
        {blocks.map((block) => {
          return (
            <div
              key={block.number}
              className="p-5 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 cursor-pointer transition">
              <h3 className="font-bold text-lg text-blue-400">
                Block #{block.number}
              </h3>
              <p className="text-sm text-gray-400 mt-1">Hash: {block.hash}</p>
              <p className="text-sm text-gray-400">
                Transactions: {block.transactions?.length}
              </p>
              <p className="text-sm text-gray-500 mt-2">Timestamp: {formatDate(block.timestamp)}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default BlockList;
