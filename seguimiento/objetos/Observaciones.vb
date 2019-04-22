Public Class Observaciones
    Private _fila As Integer
    Public Property Fila As Integer
        Get
            Return _fila
        End Get
        Set(value As Integer)
            _fila = value
        End Set
    End Property

    Private _columna As Integer
    Public Property Columna As Integer
        Get
            Return _columna
        End Get
        Set(value As Integer)
            _columna = value
        End Set
    End Property

    Private _observacion As String
    Public Property Observacion As String
        Get
            Return _observacion
        End Get
        Set(value As String)
            _observacion = value
        End Set
    End Property

    Private _color As Integer
    Public Property Color As Integer
        Get
            Return _color
        End Get
        Set(value As Integer)
            _color = value
        End Set
    End Property

End Class
