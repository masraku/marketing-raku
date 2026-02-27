import { NextResponse } from "next/server";

export function rateLimit({ interval = 60_000, limit = 30 } = {}) {
  const tokenCache = new Map();

  // Cleanup old entries periodically
  setInterval(() => {
    const now = Date.now();
    for (const [key, data] of tokenCache) {
      if (now - data.timestamp > interval) {
        tokenCache.delete(key);
      }
    }
  }, interval);

  return {
    /**
     * Check if request exceeds rate limit.
     * Returns a NextResponse with 429 if limited, or null if OK.
     */
    check(request) {
      const forwarded = request.headers.get("x-forwarded-for");
      const ip = forwarded?.split(",")[0]?.trim() || "anonymous";
      const now = Date.now();
      const tokenData = tokenCache.get(ip);

      if (!tokenData || now - tokenData.timestamp > interval) {
        tokenCache.set(ip, { count: 1, timestamp: now });
        return null;
      }

      tokenData.count++;

      if (tokenData.count > limit) {
        return NextResponse.json(
          { error: "Terlalu banyak request. Coba lagi nanti." },
          {
            status: 429,
            headers: {
              "Retry-After": String(
                Math.ceil((interval - (now - tokenData.timestamp)) / 1000)
              ),
            },
          }
        );
      }

      return null;
    },
  };
}
