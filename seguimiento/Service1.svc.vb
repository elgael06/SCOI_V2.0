Imports System.ServiceModel
Imports System.ServiceModel.Activation
Imports System.ServiceModel.Web

<ServiceContract(Namespace:="")>
<AspNetCompatibilityRequirements(RequirementsMode:=AspNetCompatibilityRequirementsMode.Allowed)>
Public Class Service1

    ' Para usar HTTP GET, agregue el atributo <WebGet()>. (El valor predeterminado de ResponseFormat es WebMessageFormat.Json)
    ' Para crear una operación que devuelva XML,
    '     agregue <WebGet(ResponseFormat:=WebMessageFormat.Xml)>
    '     e incluya la siguiente línea en el cuerpo de la operación:
    '         WebOperationContext.Current.OutgoingResponse.ContentType = "text/xml"
    <OperationContract()>
    Public Sub DoWork()
        ' Agregue aquí la implementación de la operación
    End Sub

    ' Agregue aquí más operaciones y márquelas con <OperationContract()>

End Class
