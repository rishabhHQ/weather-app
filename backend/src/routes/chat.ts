import { Router } from 'express'

const router = Router()

// POST /api/chat — Phase 3
router.post('/', async (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Chat not implemented yet — coming in Phase 3',
    statusCode: 501,
  })
})

export default router