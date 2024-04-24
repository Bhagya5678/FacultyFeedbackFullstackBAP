import dash
from dash import dcc, html
import plotly.graph_objs as go

# Sample data
players = ['Messi', 'Ronaldo', 'Mbappe', 'TAA']
scores = [99, 97, 91, 67]

# Create Dash app
app = dash.Dash(__name__)

# Define layout
app.layout = html.Div(children=[
    html.H1(children='Player Scores Bar Chart'),
    dcc.Graph(
        id='player-scores',
        figure={
            'data': [
                {'x': players, 'y': scores, 'type': 'bar', 'name': 'Player Scores'}
            ],
            'layout': {
                'title': 'Player Scores',
                'xaxis': {'title': 'Players'},
                'yaxis': {'title': 'Scores'}
            }
        }
    )
])

if __name__ == '__main__':
    app.run_server(debug=True)
