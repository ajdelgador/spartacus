interface TranslationChunksConfig {
  [chunk: string]: string[];
}

export const translationChunksConfig: TranslationChunksConfig = {
  common: [
    'common',
    'spinner',
    'searchBox',
    'navigation',
    'sorting',
    'httpHandlers',
    'pageMetaResolver',
    'miniCart',
    'miniLogin',
    'skipLink',
    'formErrors',
  ],
  cart: [
    'cartDetails',
    'cartItems',
    'orderCost',
    'voucher',
    'wishList',
    'saveForLaterItems',
  ],
  address: ['addressForm', 'addressBook', 'addressCard'],
  payment: ['paymentForm', 'paymentMethods', 'paymentCard'],
  myAccount: [
    'orderDetails',
    'orderHistory',
    'closeAccount',
    'updateEmailForm',
    'updatePasswordForm',
    'updateProfileForm',
    'consentManagementForm',
    'myCoupons',
    'wishlist',
    'notificationPreference',
    'myInterests',
    'AccountOrderHistoryTabContainer',
    'returnRequestList',
    'returnRequest',
  ],
  storeFinder: ['storeFinder'],
  pwa: ['pwa'],
  checkout: [
    'checkout',
    'checkoutAddress',
    'checkoutOrderConfirmation',
    'checkoutReview',
    'checkoutShipping',
    'checkoutProgress',
  ],
  product: [
    'productDetails',
    'productList',
    'productFacetNavigation',
    'productSummary',
    'productReview',
    'addToCart',
    'addToWishList',
    'CMSTabParagraphContainer',
    'variant',
    'stockNotification',
    'TabPanelContainer',
  ],
  user: [
    'anonymousConsents',
    'forgottenPassword',
    'loginForm',
    'register',
    'checkoutLogin',
  ],
  organization: [
    'budgetsList',
    'budget',
    'budgetForm',
    'budgetCostCenters',
    'costCenter',
    'costCentersList',
    'costCenterForm',
    'costCenterBudgets',
    'costCenterAssignBudgets',
    'permissionsList',
    'permissionForm',
    'permission',
    'orgUnitsList',
    'orgUnit',
    'orgUnitForm',
    'unitUsers',
    'unitAssignRoles',
    'unitApprovers',
    'unitAssignApprovers',
    'unitManageAddresses',
    'unitAddressDetails',
    'unitAddressCreate',
    'unitAddressEdit',
    'unitAddressForm',
    'unitCostCenters',
    'unitChildren',
    'usersList',
    'userGroupsList',
    'userGroup',
    'userGroupForm',
    'userGroupAssignPermissions',
    'userGroupAssignUsers',
  ],
};
