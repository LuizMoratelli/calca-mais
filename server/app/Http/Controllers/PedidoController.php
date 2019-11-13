<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\{Pedido, Usuario};

class PedidoController extends Controller
{
  public function index(Request $request) {
    $usuario = Usuario::find($request->usuario_id);

    return response()->json($usuario->pedidos);
  }

  public function store(Request $request) {
    $usuario = Usuario::find($request->get('usuario_id'));

    $pedido = $usuario->pedidos()->create($request->all());

    return response()->json($pedido->toArray(), 200);
  }

  public function show(Pedido $pedido) {
    $usuario = Usuario::find($request->get('usuario_id'));

    return $usuario->pedidos->find($pedido);
  }

  public function update(Request $request, Pedido $pedido) {
    $usuario = Usuario::find($request->get('usuario_id'));

    $pedido = $usuario->pedidos->find($pedido->id)->update($request->all());

    return response()->json($pedido, 200);
  }

  public function destroy(Pedido $pedido) {
    $usuario = Usuario::find($request->get('usuario_id'));

    $usuario->pedidos->find($pedido)->delete();

    return response('', 204);
  }
}
