import { hash } from "bcryptjs";

async function main() {
  const password = process.argv[2];
  if (!password || password.length < 12) {
    console.error("Usage: npm run admin:hash -- 'mot-de-passe-de-12-caracteres-minimum'");
    process.exitCode = 1;
    return;
  }

  const passwordHash = await hash(password, 12);
  console.log(`ADMIN_PASSWORD_HASH_BASE64=${Buffer.from(passwordHash).toString("base64")}`);
}

main().catch((error) => {
  console.error("Impossible de générer le hash bcrypt.", error);
  process.exitCode = 1;
});
