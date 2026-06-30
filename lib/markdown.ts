import "server-only";

// server-only garantit que ce proxy n'est jamais inclus dans le bundle client.
// La logique réelle est dans markdown-shared.ts, importable des deux côtés.
export { markdownToHtml, readingTime } from "./markdown-shared";
