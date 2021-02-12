import { PermissionService } from './../services/permission.service';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { first } from 'rxjs/operators';

@Injectable()
export class FormGuard {
  public p;
  private permissions = this.authService.userValue.permissions;
  constructor(private authService: AuthenticationService, private _permissionsService: PermissionService){}
  validateAction(formCode: string, permission: string){
    let access: boolean= false;
    const section = this.permissions.find(s => s.options?.find(o => o.code == formCode));
    if(section){
      const o = section.options.find(o => o.code == formCode);
        access = o.permissions.find(y => permission == y) ? true : false;
    }
    return access;
  }
  validateCode(path){
    const section = this.permissions.find(s => s.options?.find(o => o.path == path));
    const opt = section.options.find(o => o.path == path);
    return opt.code;
  }

}
