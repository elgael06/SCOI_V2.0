Public Class MatrizVigente
    Private _hayVigente As Integer
    Public Property HayVigente
        Get
            Return _hayVigente
        End Get
        Set(value)
            _hayVigente = value
        End Set
    End Property

    Private _ultimaMatrizId As Integer
    Public Property UltimaMatrizId As Integer
        Get
            Return _ultimaMatrizId
        End Get
        Set(value As Integer)
            _ultimaMatrizId = value
        End Set
    End Property
End Class
