from django.urls import path
from .views import ProjectList, ProjectDetail,ListProject,BoardProject,TaskProject

urlpatterns = [
    path('projects/', ProjectList.as_view({'get': 'list', 'post': 'create'}), name='project-list'),   
    # para filtrar actualizar y borrar un proyecto necesitas mandar en el url el id del proyecto
    path('projects/<int:pk>/', ProjectDetail.as_view({'get': 'retrieve', 'put': 'update','delete':'destroy','post':'create'}), name='project-detail'),  
    # para listar todoas las boards o crear una nueva board necesitas mandarle
    # el id del proyecto al cual quieres o pertece la board
    path('board/<int:pk>/', BoardProject.as_view({'get': 'list', 'post': 'create'}), name='board-task'),  
    #para listas todas listas que pertecen a un proyecto o crear una nueva
    # debes mandar el id de la board a la cual pertece la lista
    path('list-tasks/<int:pk>/', ListProject.as_view({'get': 'list', 'post': 'create'}), name='list-task'),  
    path('<int:pk>/', TaskProject.as_view({'get': 'list', 'post': 'create'}), name='task'),  


]