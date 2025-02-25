<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return Inertia::render('ToDo', [
            'todos' => Todo::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'task' => 'required|string|max:255',
        ]);

        Todo::create($validated);

        return back();
    }

    public function update(Request $request, Todo $todo)
    {
        $validated = $request->validate([
            'is_completed' => 'required|boolean',
        ]);

        $todo->update($validated);

        return back();
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
        return back();
    }
}
