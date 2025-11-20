// Central AI configuration for the app.
//
// To enable "Claude Haiku 4.5 for all clients", set the provider/model here
// or via environment variables (recommended for deployments):
//   NEXT_PUBLIC_AI_PROVIDER=claude
//   NEXT_PUBLIC_AI_MODEL=claude-haiku-4.5
//
// This file only centralizes the selection. Actually enabling access to
// Claude (authentication, network routing) requires configuring your
// runtime/service that calls the model provider (e.g., adding API keys,
// provider-specific SDK setup, or a server-side bridge).

export const AI_PROVIDER =
  (process.env.NEXT_PUBLIC_AI_PROVIDER as string) || 'claude';

export const AI_MODEL =
  (process.env.NEXT_PUBLIC_AI_MODEL as string) || 'claude-haiku-4.5';

export function getAIConfig() {
  return {
    provider: AI_PROVIDER,
    model: AI_MODEL,
  } as const;
}

export default getAIConfig;
