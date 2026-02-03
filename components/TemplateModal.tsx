"use client";

import type { GridTemplate } from "@/lib/types";
import {
  encodeVerifiableURI,
  GRID_DATA_KEY,
  UniversalProfileABI,
  fetchRawGridData,
} from "@/lib/erc725";
import {
  X,
  User,
  Grid3X3,
  Check,
  Loader2,
  AlertCircle,
  AlertTriangle,
  Layers,
} from "lucide-react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from "wagmi";
import { useState, useEffect } from "react";
import { luksoMainnet, luksoTestnet } from "@/lib/wagmi";
import { useCommunityProfile } from "@/hooks/useCommunityProfile";

interface TemplateModalProps {
  template: GridTemplate;
  onClose: () => void;
}

export function TemplateModal({ template, onClose }: TemplateModalProps) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const chain = chainId == 42 ? luksoMainnet : luksoTestnet;

  const isCommunityWithAddress =
    template.category === "community" && template.profileAddress;
  const { images, isLoading: isLoadingProfile } = useCommunityProfile(
    isCommunityWithAddress ? template.profileAddress : undefined,
  );

  const [txSuccess, setTxSuccess] = useState(false);
  const [fetchedRawValue, setFetchedRawValue] = useState<string | null>(null);
  const [isFetchingGridData, setIsFetchingGridData] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      setTxSuccess(true);
    }
  }, [isSuccess]);

  // Fetch grid data for community templates
  useEffect(() => {
    async function fetchCommunityGridData() {
      if (
        template.category === "community" &&
        template.profileAddress &&
        !template.gridData?.rawValue
      ) {
        setIsFetchingGridData(true);
        setFetchError(null);
        try {
          // Community templates are always on mainnet (42)
          const rawValue = await fetchRawGridData(
            template.profileAddress,
            chain,
          );
          if (rawValue) {
            setFetchedRawValue(rawValue);
          } else {
            setFetchError("No grid data found for this profile");
          }
        } catch (err) {
          console.error("Error fetching community grid data:", err);
          setFetchError("Failed to fetch grid data");
          setFetchedRawValue(null);
        } finally {
          setIsFetchingGridData(false);
        }
      }
    }

    fetchCommunityGridData();
  }, [template.category, template.profileAddress, template.gridData?.rawValue]);

  // Check if template has grid data configured (either rawValue, ipfsUrl, or fetched value for community)
  const hasGridData =
    template.gridData?.rawValue ||
    template.gridData?.ipfsUrl ||
    (template.category === "community" && fetchedRawValue);

  const handleApplyTemplate = async () => {
    if (!isConnected || !address) {
      alert("Please connect your Universal Profile first!");
      return;
    }

    if (!hasGridData) {
      alert("This template doesn't have grid data configured yet.");
      return;
    }

    setTxSuccess(false);

    try {
      let encodedValue: string;

      // For community templates, use fetched raw value if available
      if (
        template.category === "community" &&
        fetchedRawValue &&
        !template.gridData?.rawValue
      ) {
        encodedValue = fetchedRawValue;
      } else if (template.gridData?.rawValue) {
        // Use raw value directly if provided
        encodedValue = template.gridData.rawValue;
      } else if (template.gridData?.ipfsUrl) {
        // Encode the IPFS URL as VerifiableURI
        encodedValue = encodeVerifiableURI(
          template.gridData.ipfsUrl,
          template.gridData.hash,
        );
      } else {
        throw new Error("No grid data configured");
      }

      // Call setData on the Universal Profile using the official Grid data key
      writeContract({
        address: address as `0x${string}`,
        abi: UniversalProfileABI,
        functionName: "setData",
        args: [GRID_DATA_KEY as `0x${string}`, encodedValue as `0x${string}`],
      });
    } catch (err) {
      console.error("Error applying template:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative card rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden animate-fadeIn">
        {/* Close Button - high contrast in light and dark mode */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-gray-800/90 text-white hover:bg-gray-700 dark:bg-white/90 dark:text-gray-900 dark:hover:bg-white transition-colors shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Preview: profile/background for community, else gradient + grid */}
        <div
          className="h-40 relative overflow-hidden"
          style={{
            background: !images.backgroundImage ? template.preview : undefined,
          }}
        >
          {images.backgroundImage && (
            <img
              src={images.backgroundImage}
              alt={`${template.author}'s background`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {isCommunityWithAddress && isLoadingProfile && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Loader2 className="w-6 h-6 text-white/50 animate-spin" />
            </div>
          )}
          {!images.backgroundImage && (
            <div className="absolute inset-0 p-6 flex items-center justify-center">
              <div
                className="w-full h-full grid gap-1.5 opacity-40"
                style={{
                  gridTemplateColumns: `repeat(${template.gridConfig.columns}, 1fr)`,
                  gridTemplateRows: `repeat(${template.gridConfig.rows}, 1fr)`,
                }}
              >
                {Array.from({
                  length:
                    template.gridConfig.columns * template.gridConfig.rows,
                }).map((_, i) => (
                  <div key={i} className="bg-white/70 rounded" />
                ))}
              </div>
            </div>
          )}
          {images.profileImage && (
            <div className="absolute bottom-3 left-3">
              <img
                src={images.profileImage}
                alt={template.author}
                className="w-12 h-12 rounded-full border-2 border-white/30 object-cover shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {template.name}
          </h2>
          <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed mb-5">
            {template.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="stat-card">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs mb-1">
                <User className="w-3.5 h-3.5" />
                Author
              </div>
              <p className="text-gray-900 dark:text-white font-medium text-sm">
                {template.author}
              </p>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs mb-1">
                <Grid3X3 className="w-3.5 h-3.5" />
                Grid Size
              </div>
              <p className="text-gray-900 dark:text-white font-medium text-sm">
                {template.gridConfig.columns}x{template.gridConfig.rows}
              </p>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs mb-1">
                <Layers className="w-3.5 h-3.5" />
                Category
              </div>
              <p className="text-gray-900 dark:text-white font-medium text-sm capitalize">
                {template.category}
              </p>
            </div>
          </div>

          {/* Grid Data Key & Value Infos */}
          <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed mb-1">
            LSP28TheGrid Data Key
          </p>
          <div className="mb-4 p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5">
            <code className="text-xs text-gray-800 dark:text-gray-400 font-mono break-all">
              {GRID_DATA_KEY}
            </code>
          </div>

          {/* Value to set - show rawValue or fetched value for community templates */}
          {hasGridData && (template.gridData?.rawValue || fetchedRawValue) && (
            <>
              <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed mb-1">
                Value to set
              </p>
              {isFetchingGridData ? (
                <div className="mb-4 p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-gray-600 dark:text-gray-400 animate-spin" />
                  <span className="ml-2 text-xs text-gray-700 dark:text-gray-400">
                    Fetching grid data...
                  </span>
                </div>
              ) : (
                <div className="mb-4 p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5 overflow-x-auto">
                  <pre className="text-xs text-gray-800 dark:text-gray-400 font-mono break-all whitespace-pre-wrap">
                    {template.gridData?.rawValue || fetchedRawValue}
                  </pre>
                </div>
              )}
            </>
          )}

          {/* How to use this template */}
          <p className="text-gray-700 dark:text-gray-400 text-sm font-medium mb-1">
            How to use this template?
          </p>
          <p className="text-gray-600 dark:text-gray-500 text-xs leading-relaxed mb-5">
            Click on the Apply to Profile button below or set the metadata above
            via <code>setData(bytes32,bytes)</code> through a block explorer or
            a dApp.
          </p>

          {/* Transaction Status */}
          {fetchError && (
            <div className="mb-5 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {fetchError}
            </div>
          )}

          {!hasGridData && !isFetchingGridData && !fetchError && (
            <div className="mb-5 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              This template preview doesn&apos;t have IPFS data configured yet.
              Coming soon!
            </div>
          )}

          {error && (
            <div className="mb-5 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              Error: {error.message}
            </div>
          )}

          {txSuccess && (
            <div className="mb-5 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm flex items-center gap-3">
              <Check className="w-5 h-5" />
              Template successfully applied to your profile!
            </div>
          )}

          {/* Warning about replacing existing grid - readable in light and dark */}
          {isConnected && (
            <div className="mb-5 p-4 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-200 text-sm flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
              <span>
                If you have an existing grid setup, by clicking the button
                below, you are aware that this will replace entirely your
                existing grid.
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleApplyTemplate}
              disabled={
                !isConnected ||
                isPending ||
                isConfirming ||
                !hasGridData ||
                isFetchingGridData
              }
              className="flex-1 btn-primary py-3 px-5 rounded-xl flex items-center justify-center gap-2"
            >
              {isPending || isConfirming ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isPending ? "Confirm in wallet..." : "Applying..."}
                </>
              ) : txSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Applied!
                </>
              ) : (
                "Apply to Profile"
              )}
            </button>
            <button
              onClick={onClose}
              className="btn-secondary px-6 py-3 rounded-xl"
            >
              Close
            </button>
          </div>

          {!isConnected && (
            <p className="text-center text-gray-500 text-sm mt-4">
              Connect your Universal Profile to apply this template
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
