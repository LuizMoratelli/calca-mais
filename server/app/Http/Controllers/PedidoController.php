<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\{Pedido, Usuario};

class PedidoController extends Controller
{
  public function index(Request $request) {

    $pedidos = null;

    if ($request->input('usuario_id')) {
      $usuario = Usuario::find($request->input('usuario_id'));
      $pedidos = $usuario->pedidos;
    } else {
      $pedidos = Pedido::all();
    }

    return response()->json($pedidos);
  }

  public function store(Request $request) {
    $usuario = Usuario::find($request->input('usuario_id'));

    $pedido = $usuario->pedidos()->create($request->all());

    return response()->json($pedido->toArray(), 200);
  }

  public function show(Pedido $pedido) {
    $usuario = Usuario::find($request->input('usuario_id'));

    return $usuario->pedidos->find($pedido);
  }

  public function update(Request $request, Pedido $pedido) {
    $usuario = Usuario::find($request->input('usuario_id'));

    $pedido = $usuario->pedidos->find($pedido->id)->update($request->all());

    return response()->json($pedido, 200);
  }

  public function destroy(Pedido $pedido) {
    $pedido->delete();

    return response('', 204);
  }
}
