import { emojiAvatarForAddress } from '@/lib/web3/emojiAvatarForAddress';
import { useEffect, useMemo, useState } from 'react';
import LoaderIcon from './LoaderIcon';

export function EmojiAvatar({ address, ensImage, size = 32 }: { address: string; ensImage?: string; size?: number }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (ensImage) {
      const img = new Image();
      img.src = ensImage;
      img.onload = () => setLoaded(true);
    }
  }, [ensImage]);

  const { color: backgroundColor, emoji } = useMemo(() => emojiAvatarForAddress(address), [address]);
  return ensImage ? (
    loaded ? (
      <div
        className="absolute bg-cover rounded-full"
        style={{
          backgroundImage: `url(${ensImage})`,
          backgroundPosition: 'center',
          height: size,
          width: size,
        }}
      />
    ) : (
      <div
        className="absolute flex items-center justify-center bg-cover rounded-full text-modal"
        style={{ height: size, width: size }}
      >
        <LoaderIcon />
      </div>
    )
  ) : (
    <div
      className="flex items-center justify-center overflow-hidden rounded-full pointer-events-none"
      style={{
        ...(!ensImage && { backgroundColor }),
        height: size,
        width: size,
        fontSize: size * 0.55,
      }}
    >
      {emoji}
    </div>
  );
}
