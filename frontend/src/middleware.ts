export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile", "/new-listing/details", "/my-listing"],
};
