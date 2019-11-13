<?php
 
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Usuario;

class AuthController extends Controller {
  public function register(Request $request) {
    $usuario = Usuario::create($request->all());

    return response()->json($usuario); 
  }

  public function login(){
    $credentials = request(['email', 'password']);

    if (!$token = auth()->attempt($credentials)) {
      return response()->json(['error' => 'Não autorizado'], 401);
    }

    return $this->respondWithToken($token);
  }

  public function me(){
    return response()->json(auth()->user());
  }

  public function logout(){
    auth()->logout();

    return response()->json(['message' => 'Sucessso ao fazer logout']);
  }

  public function refresh(){
    return $this->respondWithToken(auth()->refresh());
  }

  protected function respondWithToken($token){
    return response()->json([
      'access_token' => $token,
      'token_type' => 'bearer',
      'expires_in' => auth()->factory()->getTTL() * 60
    ]);
  }
}
