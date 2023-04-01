export function isIOSDevice(userAgent: string) {
  return (
    /iPad|iPhone|iPod/.test(userAgent) ||
    (/MacIntel/.test(userAgent) && /\bTouch\b/.test(userAgent))
  );
}
