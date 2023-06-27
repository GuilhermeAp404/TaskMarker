from datetime import datetime, timedelta
import json
from flask import redirect, request, url_for
from flask_restful import Resource
from taskmarker.models import Task
from taskmarker.extensions.ext_database import db
from flask_login import current_user, login_required


class TasksApi(Resource):
    @login_required
    def get(self):
        listaTask=[]
        if not current_user.is_authenticated:
            return {'Erro':'usuario não autenticado'}, 401
        
        try:
            tasks = Task.query.filter_by(user_id=current_user.id).all()
            for task in tasks:
                task={
                    'id': task.id,
                    'title': task.title,
                    'color': task.color,
                    'allDay': task.allDay,
                    'start': str(task.start),
                    'end': str(task.end),
                    'description': task.description
                }
                listaTask.append(task)
            return listaTask, 201

        except Exception as e:
            return {'Erro':'Não foi possivel retornar os dados'}

    @login_required
    def post(self):
        if not current_user.is_authenticated:
            return {'Erro':'usuario não autenticado'}, 401

        try:
            response=json.loads(request.data)
            allDay=False
            title=response.get('title')
            color=response.get('color')
            description=response.get('description')

            if not all([title, color]):
                raise ValueError('Todos os campos obrigatórios devem ser preenchidos.')
            try:
                start = datetime.strptime(response.get('start'), '%d/%m/%Y %H:%M:%S')
                end = datetime.strptime(response.get('end'), '%d/%m/%Y %H:%M:%S')
            except ValueError:
                start = datetime.strptime(response.get('start'), '%d/%m/%Y %H:%M')
                end = datetime.strptime(response.get('end'), '%d/%m/%Y %H:%M')
            
            dif=end-start
            if dif==timedelta(days=1):
                allDay=True        
                
            if start>=end:
                raise ValueError('data invalida')
            
            new_task=Task(
                title=title, 
                user_id=current_user.id,
                description=description,
                allDay=allDay,
                color=color,
                start=start,
                end=end
            )
            db.session.add(new_task)
            db.session.commit()
            db.session.close()

            return {'sucesso': 'operação realizada com sucesso'}, 201

        except ValueError as e:
            print(e)
            return {'Erro': str(e)}, 400 

        except Exception as e:
            print(e)
            return {'Erro': 'Não foi possivel realizar a operação'}, 500 

    @login_required
    def put(self):
        if not current_user.is_authenticated:
            return {'Erro':'usuario não autenticado'}, 401

        try:
            response=json.loads(request.data)
            allDay=False
            id_task=int(response.get('id'))
            description=response.get('description')

            try:
                start = datetime.strptime(response.get('start'), '%d/%m/%Y %H:%M:%S')
                end = datetime.strptime(response.get('end'), '%d/%m/%Y %H:%M:%S')
            except ValueError:
                start = datetime.strptime(response.get('start'), '%d/%m/%Y %H:%M')
                end = datetime.strptime(response.get('end'), '%d/%m/%Y %H:%M')
            
            dif=end-start
            if dif==timedelta(days=1):
                allDay=True        
                
            if start>=end:
                raise ValueError('data invalida')
            
            Task.query.filter_by(user_id=current_user.id, id=id_task).update(dict(start=start, end=end, description=description ,allDay=allDay))
            db.session.commit()
            return{'sucesso': 'Operação realizada com sucesso'}, 201

        except ValueError as e:
            print(e)
            return {'Erro': str(e)}, 400 

        except Exception as e:
            print(e)
            return {'Erro': 'Não foi possivel realizar a operação'}, 500 

    @login_required
    def delete(self):
        if not current_user.is_authenticated:
            return {'Erro':'usuario não autenticado'}, 401
        try:
            response=json.loads(request.data)
            id_task=int(response.get('id'))
            task=Task.query.filter_by(user_id=current_user.id, id=id_task).first()
            db.session.delete(task)
            db.session.commit()
            return {'sucesso':'operação realizada'}, 201
            
        except Exception as e:
            print("erro:", str(e))
            return {'Erro': 'Não foi possivel realizar a operação'}, 500