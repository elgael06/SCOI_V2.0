Public Class TabAuxMatRea
    Private _folio As Integer
    Public Property Folio As Integer
        Get
            Return _folio
        End Get
        Set(value As Integer)
            _folio = value
        End Set
    End Property

    Private _establecimiento As String
    Public Property Establecimiento As String
        Get
            Return _establecimiento
        End Get
        Set(value As String)
            _establecimiento = value
        End Set
    End Property

    Private _descripcion As String
    Public Property Descripcion As String
        Get
            Return _descripcion
        End Get
        Set(value As String)
            _descripcion = value
        End Set
    End Property
End Class
