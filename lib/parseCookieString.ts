/**
 * Parses a "Set-Cookie" string (e.g., "token=abc; Path=/; HttpOnly")
 * into an object that Next.js cookies().set() can use.
 */
export function parseCookieString(cookieString: string) {
  const parts = cookieString.split(";");

  const [name, value] = parts[0].trim().split("=");

  const options: any = {
    name,
    value,
    path: "/",
    secure: false,
    httpOnly: false,
  };

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i].trim();
    const lowerPart = part.toLowerCase();

    if (lowerPart.startsWith("path=")) {
      options.path = part.split("=")[1];
    } else if (lowerPart.startsWith("max-age=")) {
      options.maxAge = parseInt(part.split("=")[1]);
    } else if (lowerPart.startsWith("domain=")) {
      options.domain = part.split("=")[1];
    } else if (lowerPart === "httponly") {
      options.httpOnly = true;
    } else if (lowerPart === "secure") {
      options.secure = true;
    } else if (lowerPart.startsWith("samesite=")) {
      options.sameSite = part.split("=")[1].toLowerCase();
    }
  }

  return options;
}
