<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdateProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_update_profile_fields(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')->putJson('/api/update-profile', [
            'first_name' => 'Updated',
            'last_name' => 'Name',
            'email' => 'updated@example.com',
            'number' => '1234567890',
            'dob' => '1995-04-12',
        ]);

        $response->assertOk()
            ->assertJsonPath('status', true)
            ->assertJsonPath('data.email', 'updated@example.com')
            ->assertJsonPath('data.dob', '1995-04-12');

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'first_name' => 'Updated',
            'email' => 'updated@example.com',
            'dob' => '1995-04-12',
        ]);
    }

    public function test_profile_update_rejects_an_email_used_by_another_user(): void
    {
        $user = User::factory()->create();
        User::factory()->create(['email' => 'existing@example.com']);

        $this->actingAs($user, 'sanctum')
            ->putJson('/api/update-profile', ['email' => 'existing@example.com'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('email');
    }

    public function test_profile_update_requires_authentication(): void
    {
        $this->putJson('/api/update-profile', ['first_name' => 'Updated'])
            ->assertUnauthorized();
    }
}