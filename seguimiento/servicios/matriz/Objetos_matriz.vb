Public Class Obj_matriz_datos
    Public folio
    Public matriz
    Public orden_etapa
    Public etapa
    Public orden_unidad_de_inspeccion
    Public unidad_de_inspeccion
    Public consepto
    Public ponderacion
    Public sugerido_m
    Public aspecto

End Class
Class Matrices_
    Public folio
    Public nombre
    Public establecimiento
    Public estatus As char
    Public alta As String
    Public modificacion As String
    Public cancelacion As String
    Public usuario 
End Class
Class establecimiento_matriz
    Public folio
    Public nombre
    Public estatus
End Class
Class unidad_inspeccion_matriz
    Public folio
    Public nombre
    Public abreviatura
    Public estatus
    Public alta As String
    Public modificacion As String
End Class
Class matrices_etapas
    Public folio
    Public nombre 
    Public abreviatura
    Public estatus
    Public alta As String
    Public modificacion As String
End Class
Class matrices_conceptos
    Public folio
    Public nombre
    Public abreviatura
    Public estatus
End Class
Class cuadrantes_aspecto 
     Public folio
    Public nombre
    Public estatus
    Public ponderacion
    Public orden
End Class
Class matrices_asignacion 
    Public folio
    Public folio_matriz
    Public matriz
    Public id_usuario
    Public usuario
    Public asignacion As String
    Public fecha As String
    Public id_establecimiento
    Public establecimiento
End Class
Class matrices_observaciones_resultados
    Public folio
    Public posicion
    Public respuesta
    Public observacion
End Class
Class matrices_resultados_totales
    Public r_si As Integer
    Public r_no As Integer
    Public r_na As Integer
    Public total As Integer
End Class
Class matrices_monitor_establecimiento
    Inherits matrices_resultados_totales
    Public folio_establecimiento As Integer
    Public establecimiento As String
    Public folio_matriz As Integer
    Public matriz As String
End Class
Class matrices_monitor_matriz
    Inherits matrices_resultados_totales
    Public folio_matriz As Integer
    Public matriz As String
    Public orden_etapa As Integer
    Public folio_etapa As Integer
    Public etapa As String
End Class
Class matrices_monitor_etapa
    Inherits matrices_resultados_totales
    Public folio_etapa As Integer
    Public etapa As String
    Public folio_unidad_de_inspeccion As Integer
    Public orden_unidad_de_inspeccion As Integer
    Public unidad_de_inspeccion As String
    Public concepto As String
End Class
