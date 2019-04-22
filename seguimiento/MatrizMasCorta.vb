Public Class MatrizMasCorta

    Private _unidad As String
    Public Property Unidad As String
        Get
            Return _unidad
        End Get
        Set(value As String)
            _unidad = value
        End Set
    End Property

    Private _elementoInspeccion As String
    Public Property ElementoInspeccion As String

        Get
            Return _elementoInspeccion
        End Get
        Set(value As String)
            _elementoInspeccion = value
        End Set

    End Property

    Private _aspecto
    Public Property Aspecto As String
        Get
            Return _aspecto
        End Get
        Set(value As String)
            _aspecto = value
        End Set
    End Property

    Private _cantidadCelda As Integer
    Public Property CantidadCelda
        Get
            Return _cantidadCelda
        End Get
        Set(value)
            _cantidadCelda = value
        End Set
    End Property


End Class
