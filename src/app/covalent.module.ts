import { NgModule} from '@angular/core';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule  } from '@covalent/core/steps';
/* any other core modules */

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule} from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatChipsModule} from '@angular/material/chips';

// (optional) Additional Covalent Modules imports
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { CovalentDataTableModule } from '@covalent/core/data-table';
import { CovalentSearchModule} from '@covalent/core/search';
import { CovalentPagingModule} from '@covalent/core/paging';

// other imports

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule, 
    MatListModule, 
    MatToolbarModule, 
    MatIconModule,
    MatInputModule, 
    MatCardModule, 
    MatChipsModule,
    MatFormFieldModule,
    MatMenuModule, 
    MatGridListModule, 
    MatSelectModule,
    MatTabsModule, 
    MatTooltipModule,
    CovalentLayoutModule,
    CovalentMarkdownModule,
    CovalentHighlightModule,
    CovalentDynamicFormsModule,
    CovalentHttpModule,
    CovalentStepsModule, 
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule,
    MatListModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatInputModule,
    MatCardModule, 
    MatChipsModule,
    MatFormFieldModule,
    MatMenuModule, 
    MatGridListModule, 
    MatSelectModule,
    MatTabsModule, 
    MatTooltipModule,
    CovalentLayoutModule,
    CovalentMarkdownModule,
    CovalentHighlightModule,
    CovalentDynamicFormsModule,
    CovalentHttpModule,
    CovalentStepsModule, 
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule
  ],
})
export class CustomCovalentModule { }
