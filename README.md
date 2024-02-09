## ACL
Permissions:
- "superAdmin:totalAccess"
- "superAdmin:services:read",
- "superAdmin:services:upsert",
- "superAdmin:support:read",
- "superAdmin:billing:upsert",
- "superAdmin:hosting:read",
- "superAdmin:hosting:upsert",
 

 ## Flows

 - Hosting Service
    - Invoice for service is generated
    - Invoice is paid
    - Service active is set IN_PROGRESS
    - Service active requirements is propagated 
    - Service active deliverables is propagated 
    - Hosting account is created in PENDING state
    - When user send Domain requirements an this is approved, Domain is created in PENDING state
    - Hosting account is update in ACTIVE state (After whm account is created)
    - Domain is updated in ACTIVE state (After domain is created)  

 - Domain Service
    - User select an domain
    - Invoice is Created
    - Invoice Items set in description the domain
    - Invocie Paid (serviceDomainPaid)
      -- invoice is updated
      -- notifyToSuperAdmin
      -- SendTransactional Email to user (Invoice Paid)
      -- Service Active is set IN_PROGRESS
      -- Create Domain in PENDING state
      -- Propagate Requirements: Select Service Active for associated Domain
   - At Requirement updated, associate domain with this other hosting service
   - At Domain updated as Active, make the main service active as well

- Invoice
    1- How to increment the invoice price?
      - Add news items to the invoice
      - This items not as applicate for stripe Payment *
    2- How reduce the invoice price?
      - Aplicate coupon to the invoice