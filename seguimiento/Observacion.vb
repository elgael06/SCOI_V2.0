Public Class Observacion
    Private _noMatriz As String
    Public Property NoMatriz As String
        Get
            Return _noMatriz
        End Get
        Set(value As String)
            _noMatriz = value
        End Set
    End Property

    Private _folioMatriz As String
    Public Property FolioMatriz As String
        Get
            Return _folioMatriz
        End Get
        Set(value As String)
            _folioMatriz = value
        End Set
    End Property

    Private _filaUnidad As String
    Public Property FilaUnidad As String
        Get
            Return _filaUnidad
        End Get
        Set(value As String)
            _filaUnidad = value
        End Set
    End Property

    Private _columna As String
    Public Property Columna As String
        Get
            Return _columna
        End Get
        Set(value As String)
            _columna = value
        End Set
    End Property

    Private _nombreObservacion As String
    Public Property NombreObservacion As String
        Get
            Return _nombreObservacion
        End Get
        Set(value As String)
            _nombreObservacion = value
        End Set
    End Property
End Class
