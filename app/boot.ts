import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { provide } from 'angular2/core';

import {ToastOptions} from "ng2-toastr/ng2-toastr";
    
let options = {
    autoDismiss: false,
    positionClass: 'toast-bottom-right',
};


bootstrap(AppComponent, [ ROUTER_PROVIDERS, HTTP_PROVIDERS, ROUTER_DIRECTIVES, provide(ToastOptions, { useValue: new ToastOptions(options)}) ]);