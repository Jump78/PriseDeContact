const express = require('express')
const router = express.Router()

const authMiddleware = require('./src/middlewares/authMiddleware');
const corsMiddleware = require('./src/middlewares/corsMiddleware');

const prospect = require('./src/controller/Prospect.controller')
const campaign = require('./src/controller/Campaign.controller')
const admin = require('./src/controller/Admin.controller')

router.use(corsMiddleware)

router.use(authMiddleware)

// CRUD Prospects
router.post 	('/prospect',					 			prospect.create)
router.get 		('/prospect', 							prospect.findAll)
router.get 		('/prospect/:id', 					prospect.find)
router.get 		('/prospect/:id/campaign', 	prospect.findMyCampaigns)
router.put 		('/prospect/:id', 					prospect.update)
router.post 	('/prospect/:id/campaign', 	prospect.addOneCampaign)
router.delete ('/prospect/:id', 					prospect.remove)
router.delete ('/prospect/:prospectid/campaign/:campaignid', 	prospect.removeOneCampaign)

// CRUD Campaigns
router.post 	('/campaign', 									campaign.create)
router.get 		('/campaign', 									campaign.findAll)
router.get 		('/campaign/:id', 							campaign.find)
router.get 		('/campaign/:id/prospect', 			campaign.findMyProspects)
router.get 		('/campaign/date/:date', 			  campaign.findByDate)
router.put 		('/campaign/:id', 							campaign.update)
router.post 	('/campaign/:id/prospect', 			campaign.addOneProspect)
router.delete ('/campaign/:id', 							campaign.remove)
router.delete ('/campaign/:campaignid/prospect/:prospectid', 	campaign.removeOneProspect)

// CRUD Admin accounts
router.post 	('/admin', 							admin.create)
router.post 	('/admin/login', 				admin.connect)
router.get 		('/admin', 							admin.findAll)
router.get 		('/admin/:id', 					admin.find)
router.put 		('/admin/:id', 					admin.update)
router.delete ('/admin/:id', 					admin.remove)

module.exports = router;
