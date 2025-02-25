<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TodoController extends Controller
{
    public function index(): Response
    {
        $todos = Todo::latest()->get();

        return Inertia::render('ToDo', [
            'todos' => $todos,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'task' => 'required|string|max:255',
        ]);

        Todo::create([
            'task' => $request->task,
        ]);

        return redirect()->route('to-do');
    }

    public function update(Todo $todo)
    {
        $todo->update([
            'is_completed' => !$todo->is_completed,
        ]);

        return redirect()->route('to-do');
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();

        return redirect()->route('to-do');
    }
}
