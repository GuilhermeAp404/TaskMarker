"""empty message

Revision ID: 7286c2857dcd
Revises: 995ffa18c614
Create Date: 2023-02-09 10:00:59.479150

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7286c2857dcd'
down_revision = '995ffa18c614'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.add_column(sa.Column('allDay', sa.Boolean(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.drop_column('allDay')

    # ### end Alembic commands ###