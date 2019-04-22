Public Class Matriz_realizada
    Private _elemento As String
    Public Property Elemento As String
        Get
            Return _elemento
        End Get
        Set(value As String)
            _elemento = value
        End Set
    End Property

    Private _unidad As String
    Public Property Unidad As String
        Get
            Return _unidad
        End Get
        Set(value As String)
            _unidad = value
        End Set
    End Property

    Private _aspecto As String
    Public Property Aspecto As String
        Get
            Return _aspecto
        End Get
        Set(value As String)
            _aspecto = value
        End Set
    End Property

    Public Celdas As New Collection
End Class
