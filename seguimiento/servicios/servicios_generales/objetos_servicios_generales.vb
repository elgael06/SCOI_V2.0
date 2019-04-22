Public Class objetos_servicios_genenrales

End Class
Public Class servicios_cuestionarios
    public folio
    Public cuestionario
    public folio_zona 
    Public zona
    Public folio_establecimiento
    Public establecimiento
    Public usuario_creo
    Public usuario_modifico
    Public creacion As String
    Public modificacion As String
    Public estatus
    Public departamento_aplica As Integer
    Public nombre_departamento_aplica As String

End Class
Public Class servicios_datos_cuestionarios
    Public folio
    Public orden
    Public folio_cuestionario
    Public cuestionario
    Public folio_zona
    Public zona
    Public folio_activo
    Public activo
    Public folio_criterio
    Public criterio
    Public n_servicio
End Class
Public Class servicios_por_activos
    Public folio_zona
    Public orden
    Public folio_servicio
End Class

Public Class servicios_departamento
    Public folio
    Public nombre
    Public estatus
End Class
Public Class servicio_zona
    Public folio
    Public nombre 
    Public estatus
End Class
Public Class servicios_activos
    Public folio
    Public descripcion
    Public fecha As String
    Public caracteristicas
End Class
Public Class servicio_criterio
    Public folio
    Public nombre 
    Public estatus
End Class
Public Class servicios_detalles
    Public folio
    Public nombre
    Public detalle
    Public prioridad
    Public folio_departamento
End Class
Public Class servicios_asignados_por_establecimiento
    Public folio
    Public folio_cuestionario
    Public cuestionario
    Public zona
    Public folio_departamento
    Public id_aplicador
    Public aplicador
    Public inicio As String
    Public termino As String
    Public estatus As String
End Class
class objRespuesta
    Public respuesta
End Class

Class vista_datos_por_asignacion_cuestionario
    Public folio_resultado As Integer
    Public orden As Integer
    Public folio_zona As Integer
    Public folio_activo As Integer
    Public detalle_activo As String
    Public folio_criterio As Integer
    Public detalle_criterio As String
    Public solucion As string
End Class
Class obj_prioridad
    Public folio As Integer
    Public nombre As String
    Public estatus As String
End Class
Class obj_observaciones
    public folio
    Public observacion
End Class