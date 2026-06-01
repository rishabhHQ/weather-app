// This file extends Express's built-in Request type.
// Right now it's mostly a placeholder, but in Phase 3
// we can add things like req.user for auth.

import 'express'

declare module 'express-serve-static-core' {
  interface Request {
    requestTime?: string
  }
}