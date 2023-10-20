@extends('AdminDashboard.Layout.master')
@section('title', 'Categories')
@section('content')

    <div class="main-panel">
        <div class="content-wrapper">
            <div class="row">
                <div class="col-md-12 ">
                    <br>
                    <center>
                        <a href="{{ route('categories.create') }}">
                            <button class="btn btn-primary mr-2">
                                <i class='fas fa-plus'></i>Add Category
                            </button>
                        </a>
                    </center>
                    {!! $dataTable->table() !!}
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.0.3/css/buttons.dataTables.min.css">
    <script src="https://cdn.datatables.net/buttons/1.0.3/js/dataTables.buttons.min.js"></script>
    <script src="/vendor/datatables/buttons.server-side.js"></script>
    {{ $dataTable->scripts(attributes: ['type' => 'module']) }}
@endpush
