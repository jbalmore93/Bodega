<?php

namespace App\Http\Controllers\API;

use App\Models\Categoria;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAll(){
        $data = Categoria::get();
        return response()->json($data, 200);
      }

      public function create(Request $request){
        $data['nombre'] = $request['nombre'];
        $data['descripcion'] = $request['descripcion'];
        Categoria::create($data);
        return response()->json([
            'message' => "Successfully created",
            'success' => true
        ], 200);
      }

      public function delete($id){
        $res = Categoria::find($id)->delete();
        return response()->json([
            'message' => "Successfully deleted",
            'success' => true
        ], 200);
      }

      public function get($id){
        $data = Categoria::find($id);
        return response()->json($data, 200);
      }

      public function update(Request $request,$id){
        $data['nombre'] = $request['nombre'];
        $data['descripcion'] = $request['descripcion'];
        Categoria::find($id)->update($data);
        return response()->json([
            'message' => "Successfully updated",
            'success' => true
        ], 200);
      }
}
