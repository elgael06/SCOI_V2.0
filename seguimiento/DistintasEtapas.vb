Public Class DistintasEtapas
    Private _etapa As Integer
    Property Etapa As Integer
        Get
            Return _etapa
        End Get
        Set(value As Integer)
            _etapa = value
        End Set
    End Property

    Private _nombreEtapa As String
    Public Property NombreEtapa As String
        Get
            Return _nombreEtapa
        End Get
        Set(value As String)
            _nombreEtapa = value
        End Set
    End Property
End Class
