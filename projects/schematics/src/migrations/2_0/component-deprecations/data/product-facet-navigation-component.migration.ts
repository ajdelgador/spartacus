import { PRODUCT_FACET_NAVIGATION_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

// /projects/storefrontlib/src/cms-components/product/product-list/product-facet-navigation/product-facet-navigation.component.ts
export const PRODUCT_FACET_NAVIGATION_COMPONENT_MIGRATION: ComponentData = {
  selector: 'cx-product-facet-navigation',
  componentClassName: PRODUCT_FACET_NAVIGATION_COMPONENT,
  removedProperties: [
    {
      name: 'searchResult$',
      comment: `'searchResult$' property has been removed. Please refer to the migration guide on how to handle this change.`,
    },
    {
      name: 'visibleFacets$',
      comment: `'visibleFacets$' property has been removed. Please refer to the migration guide on how to handle this change.`,
    },
    {
      name: 'toggleValue',
      comment: `'toggleValue' method has been removed. Please refer to the migration guide on how to handle this change.`,
    },
    {
      name: 'minPerFacet',
      comment: `'minPerFacet' method has been removed. Please refer to the migration guide on how to handle this change.`,
    },
    {
      name: 'showAllPerFacetMap',
      comment: `'showAllPerFacetMap' method has been removed. Please refer to the migration guide on how to handle this change.`,
    },
    {
      name: 'isFacetCollapsed',
      comment: `'isFacetCollapsed' method has been removed. Please refer to the migration guide on how to handle this change.`,
    },
    {
      name: 'getVisibleFacetValues',
      comment: `'getVisibleFacetValues' method has been removed. Please refer to the migration guide on how to handle this change.`,
    },
    {
      name: 'showMore',
      comment: `'showMore' method has been removed. Please refer to the migration guide on how to handle this change.`,
    },
  ],
};
