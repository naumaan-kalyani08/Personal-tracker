<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'date' => ['sometimes', 'date_format:Y-m-d'],
        ]);

        $tasks = $request->user()->tasks()
            ->when(isset($validated['date']), fn ($query) => $query->whereDate('due_date', $validated['date']))
            ->orderBy('is_completed')
            ->orderByRaw("CASE priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END")
            ->orderBy('created_at')
            ->get();

        return response()->json([
            'status' => true,
            'data' => $tasks,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
            'due_date' => ['required', 'date_format:Y-m-d'],
            'priority' => ['required', Rule::in(['low', 'medium', 'high'])],
        ]);

        $task = $request->user()->tasks()->create($validated)->refresh();

        return response()->json([
            'status' => true,
            'message' => 'Task created successfully',
            'data' => $task,
        ], 201);
    }

    public function update(Request $request, int $task)
    {
        $userTask = $request->user()->tasks()->findOrFail($task);
        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string', 'max:2000'],
            'due_date' => ['sometimes', 'required', 'date_format:Y-m-d'],
            'priority' => ['sometimes', 'required', Rule::in(['low', 'medium', 'high'])],
            'is_completed' => ['sometimes', 'required', 'boolean'],
        ]);

        $userTask->update($validated);

        return response()->json([
            'status' => true,
            'message' => 'Task updated successfully',
            'data' => $userTask->refresh(),
        ]);
    }

    public function destroy(Request $request, int $task)
    {
        $request->user()->tasks()->findOrFail($task)->delete();

        return response()->json([
            'status' => true,
            'message' => 'Task deleted successfully',
        ]);
    }
}
