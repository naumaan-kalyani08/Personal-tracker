<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class TaskManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_create_and_list_tasks_for_a_date(): void
    {
        $user = $this->createUser();
        $otherUser = $this->createUser();
        $task = $user->tasks()->create([
            'title' => 'Plan the week',
            'due_date' => '2026-10-20',
            'priority' => 'high',
        ]);
        $otherUser->tasks()->create([
            'title' => 'Someone else task',
            'due_date' => '2026-10-20',
            'priority' => 'low',
        ]);

        $this->actingAs($user, 'sanctum')
            ->getJson('/api/tasks?date=2026-10-20')
            ->assertOk()
            ->assertJsonPath('status', true)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $task->id);

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/tasks', [
                'title' => 'Write project notes',
                'description' => 'Capture next steps',
                'due_date' => '2026-10-20',
                'priority' => 'medium',
            ])
            ->assertCreated()
            ->assertJsonPath('data.title', 'Write project notes')
            ->assertJsonPath('data.is_completed', false);
    }

    public function test_user_can_update_complete_and_delete_only_their_own_tasks(): void
    {
        $user = $this->createUser();
        $otherUser = $this->createUser();
        $task = $user->tasks()->create([
            'title' => 'Initial title',
            'due_date' => '2026-10-20',
            'priority' => 'medium',
        ]);
        $otherTask = $otherUser->tasks()->create([
            'title' => 'Private task',
            'due_date' => '2026-10-20',
            'priority' => 'low',
        ]);

        $this->actingAs($user, 'sanctum')
            ->patchJson("/api/tasks/{$task->id}", [
                'title' => 'Updated title',
                'is_completed' => true,
            ])
            ->assertOk()
            ->assertJsonPath('data.title', 'Updated title')
            ->assertJsonPath('data.is_completed', true);

        $this->actingAs($user, 'sanctum')
            ->patchJson("/api/tasks/{$otherTask->id}", ['is_completed' => true])
            ->assertNotFound();

        $this->actingAs($user, 'sanctum')
            ->deleteJson("/api/tasks/{$task->id}")
            ->assertOk()
            ->assertJsonPath('status', true);

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
        $this->assertDatabaseHas('tasks', ['id' => $otherTask->id]);
    }

    public function test_task_validation_and_authentication_are_enforced(): void
    {
        $this->postJson('/api/tasks', [])
            ->assertUnauthorized();

        $this->actingAs($this->createUser(), 'sanctum')
            ->postJson('/api/tasks', [
                'title' => '',
                'due_date' => 'not-a-date',
                'priority' => 'urgent',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['title', 'due_date', 'priority']);
    }

    private function createUser(): User
    {
        return User::create([
            'first_name' => 'Test',
            'last_name' => Str::random(8),
            'email' => Str::uuid().'@example.com',
            'password' => 'password',
        ]);
    }
}
