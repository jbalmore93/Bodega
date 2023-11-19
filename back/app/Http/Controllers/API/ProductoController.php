<?php

namespace App\Http\Controllers\API;

use App\Models\Producto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductoController extends Controller
{
    public function getAll(){
        $data = Producto::get();
        return response()->json($data, 200);
      }

      public function create(Request $request){
        $data['nombre'] = $request['nombre'];
        $data['descripcion'] = $request['descripcion'];
        $data['precio'] = $request['precio'];
        Producto::create($data);
        return response()->json([
            'message' => "Successfully created",
            'success' => true
        ], 200);
      }

      public function delete($id){
        $res = Producto::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
      }

      public function get($id){
        $data = Producto::find($id);
        return response()->json($data, 200);
      }

      public function update(Request $request,$id){
        $data['nombre'] = $request['nombre'];
        $data['descripcion'] = $request['descripcion'];
        $data['precio'] = $request['precio'];
        Producto::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
      }
}
