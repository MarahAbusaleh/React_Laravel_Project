<?php

namespace App\DataTables;

use App\Models\Review;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Html\Editor\Editor;
use Yajra\DataTables\Html\Editor\Fields;
use Yajra\DataTables\Services\DataTable;

class ReviewDataTable extends DataTable
{
    public function dataTable(QueryBuilder $query): EloquentDataTable
    {
            return (new EloquentDataTable($query))
            ->addColumn('action', function ($query) {
                $editBtn = "<a href='" . route('reviews.edit', $query->id) . "' class='btn btn-success'><i class='far fa-edit'></i></a>";
                $deleteBtn = "<a href='" . route('reviews.destroy', $query->id) . "' class='btn btn-danger my-2 delete-item'><i class='fas fa-trash-alt'></i></a>";

                return $editBtn . $deleteBtn;
            })
            ->rawColumns(['action'])
            ->setRowId('id');}

    public function query(Review $model): QueryBuilder
    {
        return $model->newQuery();
    }

    public function html(): HtmlBuilder
    {
        return $this->builder()
                    ->setTableId('review-table')
                    ->columns($this->getColumns())
                    ->minifiedAjax()
                    //->dom('Bfrtip')
                    ->orderBy(1)
                    ->selectStyleSingle()
                    ->buttons([
                        Button::make('excel'),
                        Button::make('csv'),
                        Button::make('pdf'),
                        Button::make('print'),
                        Button::make('reset'),
                        Button::make('reload')
                    ]);
    }

public function getColumns(): array
{
    return [
        Column::make('user_id', 'User ID'), // Replace 'users.name' with 'user_id' if 'user_id' is the foreign key
        Column::make('item_id', 'Item ID'), // Replace 'items.name' with 'item_id' if 'item_id' is the foreign key
        Column::make('date'),
        Column::make('comment'),
        Column::computed('action')
            ->exportable(false)
            ->printable(false)
            ->width(60)
            ->addClass('text-center'),
    ];
}


    protected function filename(): string
    {
        return 'Review_' . date('YmdHis');
    }
}
