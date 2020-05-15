import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import {
  AuthService,
  ORGANIZATION_FEATURE,
  StateWithOrganization,
} from '@spartacus/core';
import { B2BUserService } from './b2b-user.service';
import {
  B2BUserActions,
  PermissionActions,
  UserGroupActions,
} from '../store/actions/index';
import { B2BSearchConfig } from '../model/search-config';
import * as fromReducers from '../store/reducers/index';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { UserGroup } from '../../model/user-group.model';
import { B2BUser } from '../../model/org-unit.model';
import { Permission } from '../../model/permission.model';
import { EntitiesModel } from '../../model/misc.model';

const userId = 'currentUserId';
const orgCustomerId = 'currentOrgCustomerId';
const permissionId = 'permissionId';
const permissionId2 = 'permissionId2';
const params: B2BSearchConfig = { sort: 'code' };
const permission: Permission = {
  active: true,
  code: permissionId,
};
const permission2: Permission = { ...permission, code: permissionId2 };

const b2bUser: B2BUser = {
  active: true,
  uid: orgCustomerId,
  name: 'test',
};
const b2bUser2: B2BUser = { ...b2bUser, uid: 'currentUserId2' };
const userGroup: UserGroup = {
  uid: 'userGroupUid',
  permissions: [permission],
};
const userGroup2: UserGroup = { ...userGroup, uid: 'userGroupUid2' };
const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];
const b2bUserList: EntitiesModel<B2BUser> = {
  values: [b2bUser, b2bUser2],
  pagination,
  sorts,
};
const permissionList: EntitiesModel<Permission> = {
  values: [permission, permission2],
  pagination,
  sorts,
};
const userGroupList: EntitiesModel<UserGroup> = {
  values: [userGroup, userGroup2],
  pagination,
  sorts,
};

class MockAuthService {
  getOccUserId = createSpy().and.returnValue(of(userId));
}

fdescribe('B2BUserService', () => {
  let service: B2BUserService;
  let authService: AuthService;
  let store: Store<StateWithOrganization>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ORGANIZATION_FEATURE,
          fromReducers.getReducers()
        ),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        B2BUserService,
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithOrganization>>);
    service = TestBed.get(B2BUserService as Type<B2BUserService>);
    authService = TestBed.get(AuthService as Type<AuthService>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should B2BUserService is injected', inject(
    [B2BUserService],
    (b2bUserService: B2BUserService) => {
      expect(b2bUserService).toBeTruthy();
    }
  ));

  describe('Load B2B User', () => {
    it('loadB2BUser() should should dispatch LoadB2BUser action', () => {
      service.loadB2BUser(orgCustomerId);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUser({ userId, orgCustomerId })
      );
    });
  });

  describe('Load B2B Users', () => {
    it('loadB2BUsers() should should dispatch LoadB2BUsers action', () => {
      service.loadB2BUsers(params);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUsers({ userId, params })
      );
    });
  });

  describe('get B2B user', () => {
    it('get() should load B2B user when not present in the store', () => {
      let b2bUserDetails: B2BUser;
      service
        .get(orgCustomerId)
        .subscribe((data) => {
          b2bUserDetails = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(b2bUserDetails).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUser({ userId, orgCustomerId })
      );
    });

    it('get() should be able to get user when present in the store', () => {
      store.dispatch(
        new B2BUserActions.LoadB2BUserSuccess([b2bUser, b2bUser2])
      );
      let b2bUserDetails: B2BUser;
      service
        .get(orgCustomerId)
        .subscribe((data) => {
          b2bUserDetails = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(b2bUserDetails).toEqual(b2bUser);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUser({ userId, orgCustomerId })
      );
    });
  });

  describe('get users', () => {
    it('getList() should be able to get users when not present in the store', () => {
      let users: EntitiesModel<B2BUser>;
      service
        .getList(params)
        .subscribe((data) => {
          users = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(users).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUsers({ userId, params })
      );
    });

    it('getList() should be able to get users when present in the store', () => {
      store.dispatch(
        new B2BUserActions.LoadB2BUserSuccess([b2bUser, b2bUser2])
      );
      store.dispatch(
        new B2BUserActions.LoadB2BUsersSuccess({
          params,
          page: {
            ids: [b2bUser.uid, b2bUser2.uid],
            pagination,
            sorts,
          },
        })
      );
      let users: EntitiesModel<B2BUser>;
      service
        .getList(params)
        .subscribe((data) => {
          users = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(users).toEqual(b2bUserList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUsers({ userId, params })
      );
    });

    describe('create B2B user', () => {
      it('create() should should dispatch CreateBudget action', () => {
        service.create(b2bUser);

        expect(authService.getOccUserId).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.CreateB2BUser({ userId, orgCustomer: b2bUser })
        );
      });
    });

    describe('update B2B user', () => {
      it('update() should should dispatch UpdateB2BUser action', () => {
        service.update(orgCustomerId, b2bUser);

        expect(authService.getOccUserId).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.UpdateB2BUser({
            userId,
            orgCustomerId,
            orgCustomer: b2bUser,
          })
        );
      });
    });

    describe('load B2B user approvers', () => {
      it('loadB2BUserApprovers() should should dispatch LoadB2BUserApprovers action', () => {
        service.loadB2BUserApprovers(orgCustomerId, params);

        expect(authService.getOccUserId).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.LoadB2BUserApprovers({
            userId,
            orgCustomerId,
            params,
          })
        );
      });
    });

    describe('get B2BUser approvers', () => {
      it('getB2BUserApprovers() should be able to get approvers when not present in the store', () => {
        let users: EntitiesModel<B2BUser>;
        service
          .getB2BUserApprovers(orgCustomerId, params)
          .subscribe((data) => {
            users = data;
          })
          .unsubscribe();

        expect(authService.getOccUserId).toHaveBeenCalled();
        expect(users).toEqual(undefined);
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.LoadB2BUserApprovers({
            userId,
            orgCustomerId,
            params,
          })
        );
      });

      it('getB2BUserApprovers() should be able to get approvers when present in the store', () => {
        store.dispatch(
          new B2BUserActions.LoadB2BUserSuccess(b2bUserList.values)
        );
        store.dispatch(
          new B2BUserActions.LoadB2BUserApproversSuccess({
            orgCustomerId,
            page: {
              ids: [b2bUser.uid, b2bUser2.uid],
              pagination,
              sorts,
            },
            params,
          })
        );
        let usersReceived: EntitiesModel<B2BUser>;
        service
          .getB2BUserApprovers(orgCustomerId, params)
          .subscribe((data) => {
            usersReceived = data;
          })
          .unsubscribe();
        expect(authService.getOccUserId).not.toHaveBeenCalled();
        expect(usersReceived).toEqual(b2bUserList);
        expect(store.dispatch).not.toHaveBeenCalledWith(
          new B2BUserActions.LoadB2BUserApprovers({
            userId,
            orgCustomerId,
            params,
          })
        );
      });
    });

    describe('assign approver', () => {
      it('assignApprover() should dispatch CreateB2BUserApprover action', () => {
        const approverId = 'approverId';
        service.assignApprover(orgCustomerId, approverId);

        expect(authService.getOccUserId).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.CreateB2BUserApprover({
            userId,
            orgCustomerId,
            approverId,
          })
        );
      });
    });

    describe('unassign approver', () => {
      it('unassignApprover() should dispatch DeleteB2BUserApprover action', () => {
        const approverId = 'approverId';
        service.unassignApprover(orgCustomerId, approverId);

        expect(authService.getOccUserId).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.DeleteB2BUserApprover({
            userId,
            orgCustomerId,
            approverId,
          })
        );
      });
    });

    describe('load B2B user permissions', () => {
      it('loadB2BUserPermissions() should dispatch LoadB2BUserPermissions action', () => {
        service.loadB2BUserPermissions(orgCustomerId, params);
        expect(authService.getOccUserId).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.LoadB2BUserPermissions({
            userId,
            orgCustomerId,
            params,
          })
        );
      });
    });
    describe('get B2B user permissions', () => {
      it('getB2BUserPermissions() should be able to get permissions when not present in the store', () => {
        let permissionsReceived: EntitiesModel<Permission>;
        service
          .getB2BUserPermissions(orgCustomerId, params)
          .subscribe((data) => {
            permissionsReceived = data;
          })
          .unsubscribe();

        expect(authService.getOccUserId).toHaveBeenCalled();
        expect(permissionsReceived).toEqual(undefined);
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.LoadB2BUserPermissions({
            userId,
            orgCustomerId,
            params,
          })
        );
      });

      it('getB2BUserPermissions() should be able to get permissions when present in the store', () => {
        store.dispatch(
          new PermissionActions.LoadPermissionSuccess(permissionList.values)
        );
        store.dispatch(
          new B2BUserActions.LoadB2BUserPermissionsSuccess({
            orgCustomerId,
            page: {
              ids: [permission.code, permission2.code],
              pagination,
              sorts,
            },
            params,
          })
        );
        let permissionsReceived: EntitiesModel<Permission>;
        service
          .getB2BUserPermissions(orgCustomerId, params)
          .subscribe((data) => {
            permissionsReceived = data;
          })
          .unsubscribe();
        expect(authService.getOccUserId).not.toHaveBeenCalled();
        expect(permissionsReceived).toEqual(permissionList);
        expect(store.dispatch).not.toHaveBeenCalledWith(
          new B2BUserActions.LoadB2BUserPermissions({
            userId,
            orgCustomerId,
            params,
          })
        );
      });
    });

    describe('assign permission', () => {
      it('assignPermission() should should dispatch CreateB2BUserPermission action', () => {
        service.assignPermission(orgCustomerId, permissionId);

        expect(authService.getOccUserId).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.CreateB2BUserPermission({
            userId,
            orgCustomerId,
            permissionId,
          })
        );
      });
    });

    describe('unassign permission', () => {
      it('unassignPermission() should should dispatch DeleteB2BUserPermission action', () => {
        service.unassignPermission(orgCustomerId, permissionId);

        expect(authService.getOccUserId).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.DeleteB2BUserPermission({
            userId,
            orgCustomerId,
            permissionId,
          })
        );
      });
    });
  });

  describe('load B2B User Groups', () => {
    it('loadB2BUserUserGroups() should should dispatch LoadB2BUserUserGroups action', () => {
      service.loadB2BUserUserGroups(orgCustomerId, params);
      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUserUserGroups({
          userId,
          orgCustomerId,
          params,
        })
      );
    });
  });

  describe('get B2BUser usergroups', () => {
    it('getB2BUserUserGroups() should be able to get B2Buser usergroups when not present in the store', () => {
      let userGroupsReceived: EntitiesModel<UserGroup>;
      service
        .getB2BUserUserGroups(orgCustomerId, params)
        .subscribe((data) => {
          userGroupsReceived = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(userGroupsReceived).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUserUserGroups({
          userId,
          orgCustomerId,
          params,
        })
      );
    });

    it('getB2BUserUserGroups() should be able to get B2Buser usergroups when present in the store', () => {
      store.dispatch(
        new UserGroupActions.LoadUserGroupSuccess(userGroupList.values)
      );
      store.dispatch(
        new B2BUserActions.LoadB2BUserUserGroupsSuccess({
          orgCustomerId,
          params,
          page: {
            ids: [userGroup.uid, userGroup2.uid],
            pagination,
            sorts,
          },
        })
      );
      let userGroups: EntitiesModel<UserGroup>;
      service
        .getB2BUserUserGroups(orgCustomerId, params)
        .subscribe((data) => {
          userGroups = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(userGroups).toEqual(userGroupList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUserUserGroups({
          userId,
          orgCustomerId,
          params,
        })
      );
    });
  });

  describe('assign user group', () => {
    const userGroupId = 'userGroupId';

    it('assignUserGroup() should should dispatch CreateB2BUserUserGroup action', () => {
      service.assignUserGroup(orgCustomerId, userGroupId);
      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new B2BUserActions.CreateB2BUserUserGroup({
          userId,
          orgCustomerId,
          userGroupId,
        })
      );
    });
  });

  describe('unassign user group', () => {
    const userGroupId = 'userGroupId';

    it('unassignUserGroup() should should dispatch DeleteB2BUserUserGroup action', () => {
      service.unassignUserGroup(orgCustomerId, userGroupId);
      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new B2BUserActions.DeleteB2BUserUserGroup({
          userId,
          orgCustomerId,
          userGroupId,
        })
      );
    });
  });
});
