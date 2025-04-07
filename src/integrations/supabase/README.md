
# Supabase Integration

This directory contains the Supabase client configuration and type definitions for the project.

## Generating TypeScript Types for Supabase

To generate proper TypeScript types for your Supabase database:

1. Install Supabase CLI:
```
npm install -g supabase
```

2. Login to Supabase CLI:
```
supabase login
```

3. Generate types:
```
supabase gen types typescript --project-id oqcicjjjicazrfgdgynl > src/integrations/supabase/types.ts
```

Alternatively, you can:

1. Go to the Supabase Dashboard API settings:
   https://supabase.com/dashboard/project/oqcicjjjicazrfgdgynl/api?page=tables-intro

2. Find the TypeScript types section and copy the generated TypeScript definition

3. Paste it into `src/integrations/supabase/types.ts`

After generating/updating the types, make sure to update the client.ts file to import from './types' instead of './mock-types'.
