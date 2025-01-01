import { CredentialManager, XRPC } from "@atcute/client";
export const DID = process.env.ACCOUNT_DID!;

const handler = new CredentialManager({ service: process.env.PDS_URL! });
export const bsky = new XRPC({ handler });
