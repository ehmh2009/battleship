import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PlayerShot } from '../../store/actions';
import { Observables } from '../../store/observables';
import { ApplicationState, Point } from '../../store/reducer';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  @Input() isPlayerBoard = true;
  @Input() isPlayerPerspective = true;

  private subscriptions: Subscription[] = [];
  board$;
  board: Point[][];

  constructor(
    private store: Store<ApplicationState>,
    private observables: Observables,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.board$ = this.isPlayerBoard ? this.observables.playerBoard$ : this.observables.computerBoard$;
    this.subscriptions.push(this.board$.subscribe(board => {
      this.board = board;
      this.cdr.markForCheck();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  playerShot(row: number, column: number) {
    this.store.dispatch(new PlayerShot({row, column}));
  }

}
