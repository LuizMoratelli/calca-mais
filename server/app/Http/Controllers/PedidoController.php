<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\{Pedido, Usuario};

class PedidoController extends Controller
{
  public function index(Usuario $usuario) {
    return response()->json($usuario->pedidos);
  }

  public function store(Request $request, Usuario $usuario) {
    $pedido = $usuario->pedidos()->create($request->all());

    return response()->json($pedido->toArray(), 200);
  }

  public function show(Usuario $usuario ,Pedido $pedido) {
    return $usuario->pedidos->find($pedido);
  }

  public function update(Request $request, Pedido $pedido, Usuario $usuario) {
    $pedido = $usuario->pedidos->find($pedido->id)->update($request->all());

    return response()->json($pedido, 200);
  }

  public function destroy(Pedido $pedido, Usuario $usuario) {
    $usuario->pedidos->find($pedido)->delete();

    return response('', 204);
  }
}
