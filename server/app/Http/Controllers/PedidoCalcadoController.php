<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\{Calcado, Pedido, PedidoCalcado, Usuario};
use Illuminate\Support\Str;

class PedidoCalcadoController extends Controller
{
  public function index(Pedido $pedido) {
    $pedido = Pedido::join('pedidos_calcados', 'pedidos_calcados.pedido_id', '=', 'pedidos.id')
      ->join('calcados', 'calcados.id', '=', 'pedidos_calcados.calcado_id')
      ->where('pedidos.id', $pedido->id)
      ->get();

    return response()->json($pedido);
  }

  public function store(Request $request, Pedido $pedido) {
    $calcados = $request->get('calcados');

    foreach ($calcados as $calcado) {
      if (!Calcado::find($calcado['id'])) continue;

      $pedidoCalcado = new PedidoCalcado([
        'quantidade' => $calcado['quantidade'] ?? 1,
      ]);

      $pedidoCalcado->calcado()->associate($calcado['id']);
      $pedidoCalcado->pedido()->associate($pedido);

      $pedidoCalcado->save();
    }

    return response()->json(PedidoCalcado::where('pedido_id', $pedido->id)->get(), 200);
  }

  public function show(Pedido $pedido, Calcado $calcado) {
    return $pedido->calcados()->find(
      PedidoCalcado::where([
        ['pedido_id', $pedido->id],
        ['calcado_id', $calcado->id]
      ])->get());
  }
  
  public function destroy(Pedido $pedido, Calcado $calcado) {
    $pedidoCalcado = PedidoCalcado::where([
      ['pedido_id', $pedido->id],
      ['calcado_id', $calcado->id]
    ]);

    $pedidoCalcado->delete();

    return response()->json(PedidoCalcado::where('pedido_id', $pedido->id)->get(), 200);
  }
}
